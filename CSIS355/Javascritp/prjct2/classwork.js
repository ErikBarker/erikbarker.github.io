const UMLGenVertions = [
    {
        vertion: "1.0.0",
        stable: true,
        os: "windows",
        depricated: false,
        description: "lorem ipsum",
        price: 50
    },
    {
        vertion: "1.0.0",
        stable: false,
        os: "linux",
        depricated: false,
        description: "lorem ipsum",
        price: 30
    },
    {
        vertion: "1.0.5",
        stable: true,
        os: "windows",
        depricated: false,
        description: "lorem ipsum",
        price: 50
    },
    {
        vertion: "0.0.3",
        stable: false,
        os: "windows",
        depricated: true,
        description: "lorem ipsum",
        price: 0
    },
    {
        vertion: "1.0.0",
        stable: true,
        os: "mac",
        depricated: false,
        description: "lorem ipsum",
        price: 80
    }
]

let UMLGen_Vertion_Array = UMLGenVertions.map(umlvertion=>umlvertion.vertion);

console.log(UMLGen_Vertion_Array);

const windows_UMLGen = UMLGenVertions.filter(umlvertion=>umlvertion.os==="windows");

console.log(windows_UMLGen)