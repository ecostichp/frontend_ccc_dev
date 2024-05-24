import locations from "../data/locations"

const storeLoader = ({params}) => {
    const location = locations.find((item) => item.id === params.storeId);
    return (location)
}

export default storeLoader;