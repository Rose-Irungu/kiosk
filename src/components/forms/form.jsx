"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { userService } from "../../services/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/forms/formid";

import { Input } from "@/components/forms/input";
import { Button } from "@/components/forms/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/forms/select";

import uploadIcon from "@/assets/group01.svg";

const RequiredLabel = ({ children }) => (
  <FormLabel className="font-medium">
    {children}
    <span className="text-red-500 ml-1">*</span>
  </FormLabel>
);


const formSchema = z
  .object({
    role: z.string().min(1, { message: "Please select a role." }),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(10, "Enter a valid phone number"),
    idNo: z.string().min(4, "ID number is required"),
    unit: z.string().min(1, "Unit is required"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    photo: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function UserForm({
  title = "User Registration",
  submitLabel = "Submit",
  setUsers,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const editUser = location.state?.user;
  const editMode = location.state?.editMode;

  const [units, setUnits] = useState([]);
  const [showValidationError, setShowValidationError] = useState(false);
  const [preview, setPreview] = useState(null);
  const [serverMessage, setServerMessage] = useState(""); 

  
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      role: editUser?.role || "",
      firstName: editUser?.first_name || "",
      lastName: editUser?.last_name || "",
      email: editUser?.email || "",
      phone: editUser?.phone_number || "",
      idNo: editUser?.id_number || "",
      unit: editUser?.unit_number?.toString() || "",
      password: "",
      confirmPassword: "",
      photo: null,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    trigger,
    setFocus,
    formState,
  } = form;

  useEffect(() => {
    userService
      .getAllUnits()
      .then(setUnits)
      .catch((err) => console.error("Failed to fetch units:", err));
  }, []);

  useEffect(() => {
    if (editMode && editUser) {
      reset({
        role: editUser.role,
        firstName: editUser.first_name,
        lastName: editUser.last_name,
        email: editUser.email,
        phone: editUser.phone_number,
        idNo: editUser.id_number,
        unit: editUser.unit_number?.toString() || "",
        password: "",
        confirmPassword: "",
        photo: null,
      });
      setPreview(null);
    }
  }, [editMode, editUser, reset]);

  useEffect(() => {
    if (Object.keys(formState.errors).length === 0) {
      setShowValidationError(false);
    }
  }, [formState.errors]);

  
  const normalizeError = (err) => {
    if (err === null || typeof err === "undefined") return "";
    if (typeof err === "string") return err;
    if (typeof err === "number" || typeof err === "boolean") return String(err);
    if (Array.isArray(err)) return err.map(normalizeError).join(", ");
    if (typeof err === "object") {
      return Object.values(err).map(normalizeError).join(", ");
    }
    return String(err);
  };

  
  const fieldMap = {
    first_name: "firstName",
    last_name: "lastName",
    email: "email",
    phone_number: "phone",
    id_number: "idNo",
    unit_number: "unit",
    role: "role",
    password: "password",
    confirm_password: "confirmPassword",
    profile_picture: "photo",
  };

  
  const handleServerErrors = (errData) => {
    
    if (!errData) {
      setServerMessage("Unknown server error");
      setShowValidationError(true);
      return;
    }

    const payload = errData.errors ? errData.errors : errData;

   
    if (typeof payload === "object" && !Array.isArray(payload)) {
      const keys = Object.keys(payload);
      const looksLikeFieldErrors = keys.some((k) => {
        return (
          Object.prototype.hasOwnProperty.call(fieldMap, k) ||
          
          ["email", "firstName", "lastName", "phone", "idNo", "unit", "role", "photo"].includes(k)
        );
      });

      if (looksLikeFieldErrors) {
        
        setServerMessage("");

        keys.forEach((field) => {
          const mappedField = fieldMap[field] || field;
          const normalized = normalizeError(payload[field]);

          
          try {
            setError(mappedField, {
              type: "server",
              message: normalized,
            });
          } catch (e) {
            
            setServerMessage((prev) =>
              prev ? `${prev}; ${mappedField}: ${normalized}` : `${mappedField}: ${normalized}`
            );
          }
        });

        setShowValidationError(true);
        const firstField = keys[0];
        const mappedFirst = fieldMap[firstField] || firstField;
        
        try {
          setFocus(mappedFirst);
        } catch (e) {
        
        }
        return;
      }
    }

    
    const generic = normalizeError(errData.detail ?? errData);
    setServerMessage(generic || "An error occurred. Please try again.");
    setShowValidationError(true);
  };

  const onSubmit = async (values) => {
    setServerMessage("");
    try {
      const formData = new FormData();
      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone);
      formData.append("id_number", values.idNo);
      formData.append("unit_number", values.unit);
      formData.append("role", values.role);
      if (values.password) formData.append("password", values.password);
      if (values.photo) formData.append("profile_picture", values.photo);

      if (editMode) {
        await userService.updateUser(editUser.id, formData);
      } else {
        const addedUser = await userService.addUser(formData);
        if (setUsers) setUsers((prev) => [...prev, addedUser]);
      }

     
      reset();
      setPreview(null);
      navigate("/userspage");
    } catch (error) {
      
      console.error("Error submitting user:", error);

      
      const respData = error?.response?.data;
      if (respData) {
        handleServerErrors(respData);
      } else {
       
        setServerMessage(error?.message ?? "Failed to submit user. Please try again.");
        setShowValidationError(true);
      }
    }
  };

 
  const showFieldError = (name) => {
    return (
      !!formState.errors[name] &&
      (showValidationError || formState.touchedFields[name] || formState.isSubmitted)
    );
  };

  
  const renderServerMessage = () => {
    if (!serverMessage) return null;
   
    return (
      <div className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded text-sm">
        {serverMessage}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EEEAFD]">
      <Layout>
        <div className="p-4 md:p-6 flex justify-center">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              {editMode ? "Edit User" : title}
            </h2>

            <Form {...form}>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit, (errors) => {
                  setShowValidationError(true);
                  trigger();
                  const first = Object.keys(errors)[0];
                  if (first) setFocus(first);
                })}
                className="space-y-6"
              >
                {showValidationError && (
                  <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-3 rounded-md text-sm">
                    Please fix the errors in the form before submitting.
                  </div>
                )}

               
                {renderServerMessage()}

                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => {
                    const errorMsg = normalizeError(formState.errors.role?.message);
                    return (
                      <FormItem>
                        <RequiredLabel>Role</RequiredLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          onBlur={field.onBlur}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`bg-[#f4eaff] ${showFieldError("role") ? "border border-red-500" : ""}`}
                            >
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tenant">Resident</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        {showFieldError("role") && (
                          <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["email", "Email"],
                  ].map(([name, label]) => (
                    <FormField
                      key={name}
                      control={control}
                      name={name}
                      render={({ field }) => {
                        const errorMsg = normalizeError(formState.errors[name]?.message);
                        return (
                          <FormItem>
                            <RequiredLabel>{label}</RequiredLabel>
                            <FormControl>
                              <Input
                                className={`bg-[#f4eaff] ${showFieldError(name) ? "border border-red-500 ring-1 ring-red-500" : ""}`}
                                placeholder={`Enter ${label}`}
                                {...field}
                              />
                            </FormControl>
                            {showFieldError(name) && (
                              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                            )}
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    ["phone", "Phone No."],
                    ["idNo", "ID No."],
                  ].map(([name, label]) => (
                    <FormField
                      key={name}
                      control={control}
                      name={name}
                      render={({ field }) => {
                        const errorMsg = normalizeError(formState.errors[name]?.message);
                        return (
                          <FormItem>
                            <RequiredLabel>{label}</RequiredLabel>
                            <FormControl>
                              <Input
                                className={`bg-[#f4eaff] ${showFieldError(name) ? "border border-red-500 ring-1 ring-red-500" : ""}`}
                                placeholder={`Enter ${label}`}
                                {...field}
                              />
                            </FormControl>
                            {showFieldError(name) && (
                              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                            )}
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormField
                    control={control}
                    name="unit"
                    render={({ field }) => {
                      const errorMsg = normalizeError(formState.errors.unit?.message);
                      return (
                        <FormItem>
                          <RequiredLabel>Unit</RequiredLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            onBlur={field.onBlur}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`bg-[#f4eaff] ${showFieldError("unit") ? "border border-red-500" : ""}`}
                              >
                                <SelectValue placeholder="Select a unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {units.map((unit) => (
                                <SelectItem key={unit.id} value={String(unit.id)}>
                                  {unit.unit_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {showFieldError("unit") && (
                            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {!editMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["password", "Password"],
                      ["confirmPassword", "Confirm Password"],
                    ].map(([name, label]) => (
                      <FormField
                        key={name}
                        control={control}
                        name={name}
                        render={({ field }) => {
                          const errorMsg = normalizeError(formState.errors[name]?.message);
                          return (
                            <FormItem>
                              <RequiredLabel>{label}</RequiredLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  className={`bg-[#f4eaff] ${showFieldError(name) ? "border border-red-500 ring-1 ring-red-500" : ""}`}
                                  placeholder={`Enter ${label}`}
                                  {...field}
                                />
                              </FormControl>
                              {showFieldError(name) && (
                                <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                              )}
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                )}

               
                <FormField
                  control={control}
                  name="photo"
                  render={({ field: { onChange } }) => {
                    const errorMsg = normalizeError(formState.errors.photo?.message);
                    return (
                      <FormItem>
                        <FormLabel className="font-medium">Photo</FormLabel>
                        <FormControl>
                          <div className="bg-[#f4eaff] h-28 rounded-md border border-dashed flex items-center justify-center text-sm text-gray-500 relative overflow-hidden">
                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setPreview(URL.createObjectURL(file));
                                  onChange(file);
                                }
                              }}
                              accept="image/*"
                              className="opacity-0 absolute w-full h-full cursor-pointer"
                            />
                            {preview ? (
                              <img
                                src={preview}
                                alt="Preview"
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <div className="bg-[#085ca10d] rounded-full p-2 w-12 h-12 flex items-center justify-center">
                                  <img src={uploadIcon} alt="Upload" className="w-6 h-6" />
                                </div>
                                <span className="text-sm text-gray-500 text-center">
                                  Upload a User’s Photo
                                </span>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        {showFieldError("photo") && (
                          <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#005E0E] hover:bg-gradient-to-r hover:from-[#01450b] hover:to-[#01450b] text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
                >
                  {editMode ? "Update" : submitLabel}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UserForm;
export const UserFormSchema = formSchema;
