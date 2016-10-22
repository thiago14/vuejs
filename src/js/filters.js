//* ---------------------
//*   Vue FILTER LABEL
//* ---------------------
Vue.filter('doneLabel', (value) => (value) ? 'Paga': 'Não paga' )

Vue.filter('doneLabelReceive', (value) => (value) ? 'Recebido' : 'Não recebido' )

Vue.filter('currencyFormat', {
    read(value, lang = 'pt-BR', currency = 'BRL') {
        if(!isNaN(value))
        {
            return new Intl.NumberFormat(lang, { style: 'currency', currency: currency}).format(value);
        }
        return 'R$0'
    },
    write (value) {
        if(value.length > 0)
        {
            let number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.')
            return isNaN(number) ? 0 : parseFloat(number)
        }
        return 'R$0'
    }
})

Vue.filter('dateFormat', {
    read(value, lang = 'pt-BR') {
        let date = new Date(value)
        if(date instanceof Date && date.getMonth())
        {
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
            return new Intl.DateTimeFormat(lang).format(date).split(' ')[0]
        }
        return ''
    },
    write (value) {
        let date = value.match(/\d{2}\/\d{2}\/\d{4}/g)
        if(date)
        {
            return date[0].split('/').reverse().join('-')
        }
        return ''
    }
})

Vue.filter('stringUppercase', {
    read(value) {
        if(value !== undefined && value.length > 0)
        {
            return value.toUpperCase()
        }
        return value

    },
    write (value) {
        if(value !== undefined && value.length > 0)
        {
            return value. toLowerCase()
        }
        return value
    }
})