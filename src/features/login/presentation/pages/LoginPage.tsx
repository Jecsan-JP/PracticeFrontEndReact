import LoginFormComponent from "../components/LoginFormComponent";

function LoginPage() {
  return (
    <>
    {/* cambio para que se haga el deploy */}
      {/* component */}
      <div className="bg-primary text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
        <a href="https://dalefon.mx">
          <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
            <img
              src="https://play-lh.googleusercontent.com/pqnqOp9Ra6cKWAMQAwnkMBadWm27g3Os5ug2Kjg9MVy9nmc78WjC01KjJ7v5XTrfNw=w240-h480"
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full" // Tamaño fijo y forma circular
            />
            <span className="text-2xl font-semibold tracking-tighter">
              Bienvenidos a mi prueba
            </span>
          </div>
        </a>
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
          <div
            className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
            //   bis_skin_checked={1}
          />
          <div className="mx-5 border bg-accent dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Login
              </h3>
              <p className="mt-1.5 text-sm font-medium text-white/50">
                Bienvenido, por favor ingrese su correo y contraseña
              </p>
            </div>
            <div className="p-6 pt-0 ">
              <LoginFormComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
