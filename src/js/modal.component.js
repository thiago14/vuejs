//* ---------------------
//*   Vue Modal COMPONENT
//* ---------------------
window.modalComponent = Vue.extend({
    template: `
    <div :id="modal" class="modal modal-fixed-footer">
        <div class="modal-content">
            <slot name="content">
                <slot name="title">
                    <h4>Mensagem de confirmação</h4>
                </slot>
                <slot name="message">
                    <p>Tem certeza que deseja fazer essa ação?</p>
                </slot>
            </slot>
        </div>
        <div class="modal-footer">
            <slot name="footer">
                <slot name="confirm">
                    <button class="modal-action modal-close modal-action waves-effect waves-green btn-flat green">Confirmar</button>
                </slot>
                <slot name="cancel">
                    <button class="modal-action modal-close waves-effect waves-gray btn-flat">Cancelar</button>
                </slot>
            </slot>
        </div>
    </div>
    `,
    props:['modal'],
    data() {
        return {
            modal: ''
        }
    }
})
