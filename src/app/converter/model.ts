export class ConverterModel {
    constructor(
        public base_currency: string = '',
        public target_currency: string = '',
        public amount: number = 1,
        public date: string = ''
    ) { }
}