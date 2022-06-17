import Loader from "react-js-loader";

export const Loader1 = () => {
    return (
        <div className="w-full h-full absolute flex justify-center items-center bg-black bg-opacity-50">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export const Loader2 = () => {
    return (
        <div className="flex justify-center items-center bg-black bg-opacity-50 absolute w-full h-full">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export const Loader3 = ({className}) => {
    return (
        <>
            <div className={`h-8 flex items-center w-full ${className}`}>
                <Loader 
                    type="box-up" 
                    bgColor={"#FFFFFF"} 
                    title={""} 
                    color={'#FFFFFF'} 
                    size={100} 
                />
            </div>
        </>
    )
}