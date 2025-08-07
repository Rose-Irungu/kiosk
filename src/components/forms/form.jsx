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

// Label with required asterisk
const RequiredLabel = ({ children }) => (
  <FormLabel className="font-medium">
    {children}
    <span className="text-red-500 ml-1">*</span>
  </FormLabel>
);

// Zod schema
const formSchema = z
  .object({
    role: z.string({ required_error: "Please select a role." }),
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
  const [showValidationError, setShowValidationError] = useState(false); // ⚠️ Added

  const form = useForm({
    resolver: zodResolver(formSchema),
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

  useEffect(() => {
    if (editMode && editUser) {
      form.reset({
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
    }
  }, [editMode, editUser, form]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await userService.getAllUnits();
        setUnits(data);
      } catch (err) {
        console.error("Failed to fetch units:", err);
      }
    };
    fetchUnits();
  }, []);

  // Optional auto-dismiss
  useEffect(() => {
    if (showValidationError) {
      const timer = setTimeout(() => {
        setShowValidationError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showValidationError]);

  const onSubmit = async (values) => {
    setShowValidationError(false);
    try {
      const formData = new FormData();
      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone);
      formData.append("id_number", values.idNo);
      formData.append("unit_number", values.unit);
      formData.append("role", values.role);
      if (values.password) {
        formData.append("password", values.password);
      }
      if (values.photo) {
        formData.append("profile_picture", values.photo);
      }

      if (editMode) {
        await userService.updateUser(editUser.id, formData);
      } else {
        const addedUser = await userService.addUser(formData);
        if (setUsers) {
          setUsers((prev) => [...prev, addedUser]);
        }
      }

      form.reset();
      navigate("/userspage");
    } catch (error) {
      console.error("Error submitting user:", error);
      alert("Failed to submit user. Please try again.");
    }
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
                onSubmit={form.handleSubmit(onSubmit, () => {
                  setShowValidationError(true); // 🧨 Trigger popup on validation failure
                })}
                className="space-y-6"
              >
                {/* 🔴 Popup Error Message */}
                {showValidationError && (
                  <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-3 rounded-md text-sm">
                    Please fix the errors in the form before submitting.
                  </div>
                )}

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel>Role</RequiredLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#f4eaff]">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tenant">Resident</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["email", "Email"],
                  ].map(([name, label]) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <RequiredLabel>{label}</RequiredLabel>
                          <FormControl>
                            <Input
                              className="bg-[#f4eaff] placeholder-gray-600"
                              placeholder={`Enter ${label}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                {/* Phone, ID, Unit Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel>Phone No.</RequiredLabel>
                        <FormControl>
                          <Input
                            className="bg-[#f4eaff] placeholder-gray-600"
                            placeholder="Enter Phone No."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ID */}
                  <FormField
                    control={form.control}
                    name="idNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel>ID No.</RequiredLabel>
                        <FormControl>
                          <Input
                            className="bg-[#f4eaff] placeholder-gray-600"
                            placeholder="Enter ID No."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Unit */}
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel>Unit</RequiredLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[#f4eaff]">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password Fields (Only on Add) */}
                {!editMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["password", "Password"],
                      ["confirmPassword", "Confirm Password"],
                    ].map(([name, label]) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <RequiredLabel>{label}</RequiredLabel>
                            <FormControl>
                              <Input
                                type="password"
                                className="bg-[#f4eaff] placeholder-gray-600"
                                placeholder={`Enter ${label}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                )}

                {/* File Upload */}
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field: { onChange } }) => {
                    const [preview, setPreview] = useState(null);

                    const handleFileChange = (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        onChange(file);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel className="font-medium">Photo</FormLabel>
                        <FormControl>
                          <div className="bg-[#f4eaff] h-28 rounded-md border border-dashed flex items-center justify-center text-sm text-gray-500 relative overflow-hidden">
                            <input
                              type="file"
                              onChange={handleFileChange}
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
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-[#005E0E] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-600 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-300"
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
