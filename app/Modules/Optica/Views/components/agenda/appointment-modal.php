<!-- ==========================================================
     Modal de citas
========================================================== -->

<div
    class="modal"
    id="appointment-modal"
    aria-hidden="true"
>
    <div
        class="modal__overlay"
        data-modal-close
    ></div>

    <div
        class="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
    >
        <div class="modal__header">

            <div>
                <span class="modal__subtitle">
                    Agenda
                </span>

                <h2
                    class="modal__title"
                    id="appointment-modal-title"
                >
                    Nueva cita
                </h2>
            </div>

            <button
                type="button"
                class="modal__close"
                id="appointment-modal-close"
                aria-label="Cerrar modal"
            >
                ✕
            </button>

        </div>

        <form id="appointment-form">

            <input
                type="hidden"
                id="appointment-id"
            >

            <input
                type="hidden"
                id="appointment-mode"
                value="create"
            >

            <div class="modal__grid">

                <div class="form-group">

                    <label for="appointment-client">
                        Cliente
                    </label>

                    <input
                        type="text"
                        id="appointment-client"
                        name="cliente"
                        placeholder="Nombre del cliente"
                        autocomplete="off"
                        required
                    >

                </div>

                <div class="form-group">

                    <label for="appointment-date">
                        Fecha
                    </label>

                    <input
                        type="date"
                        id="appointment-date"
                        name="fecha"
                        required
                    >

                </div>

                <div class="form-group">

                    <label for="appointment-time">
                        Hora
                    </label>

                    <input
                        type="time"
                        id="appointment-time"
                        name="hora"
                        required
                    >

                </div>

                <div class="form-group">

                    <label for="appointment-status">
                        Estado
                    </label>

                    <select
                        id="appointment-status"
                        name="estado"
                        required
                    >
                        <option value="Confirmada">
                            Confirmada
                        </option>

                        <option value="Pendiente">
                            Pendiente
                        </option>

                        <option value="En espera">
                            En espera
                        </option>

                        <option value="Cancelada">
                            Cancelada
                        </option>
                    </select>

                </div>

                <div class="form-group form-group--full">

                    <label for="appointment-reason">
                        Motivo
                    </label>

                    <textarea
                        id="appointment-reason"
                        name="motivo"
                        rows="4"
                        placeholder="Escribe el motivo de la cita"
                        required
                    ></textarea>

                </div>

            </div>

            <div class="modal__footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    id="appointment-cancel"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    class="btn btn-primary"
                    id="appointment-save"
                >
                    Guardar cita
                </button>

            </div>

        </form>

    </div>
</div>