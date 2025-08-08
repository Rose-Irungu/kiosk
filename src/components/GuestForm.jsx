import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useForm} from "react-hook-form";

export function GuestFormFields({control}) {

  const form = useForm();
  return (
   <Form {...form}>
    <FormField  
        control={control}
        name="guestName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Name</FormLabel>
            <FormControl>
              <Input placeholder="Audrey" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> 

       <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+254-723-456-789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="janenjoroge@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="hostUnit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Host Name/Unit</FormLabel>
            <FormControl>
              <Input placeholder="Angela Sinei (302b)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="carPlate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Car Number Plate (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="KCW 123K" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
        name="photo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Photo (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
        Submit
      </Button>
   </Form>
  );
}
