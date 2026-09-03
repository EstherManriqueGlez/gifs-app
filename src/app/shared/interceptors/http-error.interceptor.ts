import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const SHOW_TOAST_MS = 3500;

function showToast(message: string, type: 'error' | 'info' = 'error') {
  const existing = document.querySelector('#http-error-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'http-error-toast';
  toast.setAttribute('role', 'alert');
  toast.className =
    'fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-[90vw] px-5 py-3 rounded-lg shadow-xl text-white text-sm font-medium ' +
    (type === 'error'
      ? 'bg-red-600'
      : 'bg-blue-600');

  const icon = document.createElement('i');
  icon.className =
    type === 'error'
      ? 'fa-solid fa-circle-exclamation mr-2'
      : 'fa-solid fa-circle-info mr-2';
  toast.appendChild(icon);

  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), SHOW_TOAST_MS);
}

function getErrorMessage(status: number, statusText: string): string {
  switch (status) {
    case 401:
      return 'No autorizado. Revisa la API key. (401)';
    case 403:
      return 'Acceso denegado. (403)';
    case 404:
      return 'Recurso no encontrado. (404)';
    case 408:
      return 'Tiempo de espera agotado. (408)';
    case 429:
      return 'Demasiadas peticiones. Inténtalo más tarde. (429)';
    default:
      if (status >= 500) {
        return 'Error del servidor. Inténtalo de nuevo. (' + status + ')';
      }
      return statusText || 'Error desconocido en la petición. (' + status + ')';
  }
}

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        showToast('Error de red. Comprueba tu conexión.');
      } else {
        const message = getErrorMessage(error.status, error.statusText);
        showToast(message);
        console.error(`[HTTP ${error.status}]`, error.message);
      }

      return throwError(() => error);
    })
  );
};
