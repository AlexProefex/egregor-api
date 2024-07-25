export const MessaeSendResponseIsNotEmpty = (value) => { return `${value}: no puede estar en blanco`}  
export const MessaeSendResponseIsNumber = (value) => { return `${value}: debe ser numerico`}  
export const MessaeSendResponseIsBoolean = (value) => { return `${value}: solo acepta true / false`}  
export enum StatusEnumTable {
    Plantilla='Plantilla',
    E_book='E-book'
}