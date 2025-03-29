import Swal from "sweetalert2";
import { SwalManager } from "../../domain/models/SwalManager";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton:
      "bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700",
    cancelButton:
      "bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700",
    actions: "flex justify-between space-x-4",
  },
  buttonsStyling: false,
});

export class SwalDataManager implements SwalManager {
  showSuccesMessage(title: string, subtitle: string) {
    Swal.fire(title, subtitle, "success");
  }

  showErrorMessage(title: string, text: string) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
    });
  }

  showError(error: Error): void {
    Swal.fire(
      error.name ?? "Algo salió mal",
      error.message ?? error.stack ?? "Intenta más tarde",
      "error"
    );
  }

  async deleteItem(item: string, successfulAction: () => void): Promise<any> {
    return swalWithBootstrapButtons
      .fire({
        title: `¿Estas seguro que deseas eliminar ${item}?`,
        text: "Ésta acción es irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Si, eliminar ${item}!`,
        cancelButtonText: "¡No, cancelar acción!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          successfulAction();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showCanceledAction(item);
        }
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  showSuccessfulAction(item: string): void {
    swalWithBootstrapButtons.fire(
      `¡${item} eliminado!`,
      "La acción se ha realizado correctamente.",
      "success"
    );
  }

  showCanceledAction(item: string): void {
    swalWithBootstrapButtons.fire(
      "¡Acción cancelada!",
      `${item} seguro.`,
      "error"
    );
  }

  async requestConfirmationDeleteDocument(
    successfulAction: () => void
  ): Promise<any> {
    return swalWithBootstrapButtons
      .fire({
        title: `¿Está seguro que deseas eliminar el documento?`,
        text: "Ésta acción es irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Si, eliminar.`,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // swalWithBootstrapButtons.fire(
          //     `¡Documento eliminado!`,
          //     'La acción se ha realizado correctamente.',
          //     'success'
          // );
          successfulAction();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.close();
        }
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  async requestConfirmationDeleteUserAsset(
    successfulAction: () => void
  ): Promise<any> {
    return swalWithBootstrapButtons
      .fire({
        title: `¿Está seguro que deseas eliminar el usuario?`,
        text: "Ésta acción es irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Si, eliminar.`,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          successfulAction();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.close();
        }
      })
      .catch((error) => {
        this.showError(error);
      });
  }
}
