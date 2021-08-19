import M from 'materialize-css'
export default {
    install: (app) => {
        // Код плагина будет здесь
        app.config.globalProperties.$message = (html) => {
            M.toast({html})
        }

        app.config.globalProperties.$error = (html) => {
            M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}