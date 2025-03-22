import { signInAction } from "@/lib/actions";
import { FormMessage, Message } from "@/components/FormMessage";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <section className="group min-w-64 ">
        <Link
          href="/"
          className="inline-flex items-center hover:text-black/70 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-2" />
          Volver a inicio
        </Link>
      </section>
      <form className="flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
{/*         <p className="text-sm text-foreground">
          No tienes una cuenta?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Registrarse
          </Link>
        </p> */}
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Contraseña</Label>
            {/*           <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Contraseña olvidada?
          </Link> */}
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Tú contraseña"
            required
          />
          <SubmitButton
            pendingText="Iniciando sesión..."
            formAction={signInAction}
          >
            Iniciar sesión
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
