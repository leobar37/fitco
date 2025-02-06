import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/controllers/auth";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const login = useLogin();
  const form = useForm({});
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });
  return (
    <div className={cn("flex justify-center items-center h-screen gap-6")}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Inicio se sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <Button type="button" onClick={onSubmit} className="w-full">
                Login
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
