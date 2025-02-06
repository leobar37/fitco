import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";

export default function UserProfile() {
  const { authInfo, logout } = useAuth();
  const user = authInfo?.user;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <strong>Nombre:</strong> {user?.name}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
          <div>
            <Button
              variant={"destructive"}
              onClick={() => {
                logout();
              }}
            >
              Cerrar sesiósn
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
