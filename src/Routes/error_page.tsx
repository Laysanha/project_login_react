import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Lamentamos, mas ocorreu um erro inesperado.</p>
            <p>
            <i>{(error as Error)?.message || (error as {statusText?: string})?.statusText}</i>
            </p>
            <Link to="/">Voltar</Link>
      </div>
    )
}