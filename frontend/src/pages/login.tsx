import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/controllers/auth";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/auth";

export function LoginForm() {
  const loginMutation = useLogin();
  const form = useForm({
    resolver:  zodResolver(loginSchema)
  });
  const { setAuthInfo } = useAuth();
  const navigate = useNavigate();
  const onSubmit = form.handleSubmit(async (values) => {
   const result =  await loginMutation.mutateAsync({
      email: values.email,
      password: values.password,
    });
    setAuthInfo({
      token: result.token,
      user: result.user
    })
    navigate("/")
  });
  const isLoading = loginMutation.isPending;
  const isValid =  form.formState.isValid;
  const isDisabled = isLoading || !isValid
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
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <Button type="button" onClick={onSubmit} className="w-full" disabled={isDisabled} >
                Login
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
