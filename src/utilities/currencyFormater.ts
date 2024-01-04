
// undefined as location so it will automaticlly format to your location
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {currency: "GBP", style: "currency"} )

export function CurencyFormatter(number: number) {
    return(CURRENCY_FORMATTER.format(number))
}