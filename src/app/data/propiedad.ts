export class Propiedad {
    type: string = "";
    status: string = "";
    location: string = "";
    comuna: string = "";
    rooms: number = 0;
    price: {
        value: number;
        unit: string;
    } = {
        value: 0,
        unit: "CLP"
    };
    area: {
        value: number;
        unit: string;
    } = {
        value: 0,
        unit: "mt2"
    };
    parkings: number = 0;
    baths: number = 0;
    description: string = "";
    date;
    images: Array<{name: string, url: string}> = [];
}
