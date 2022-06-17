import { Loader2 } from './loaders';

export const Panel = ({header, confirmHandler, loading, children}) => {

    return (
        <div className="bg-white rounded text-black relative">
        { loading && <Loader2 /> }
            <div className="w-full border-b-2 border-black px-3 py-3">{header}</div>
            <div className="p-3">
                {children}
            </div>
            <div className="flex justify-end p-3">
                <button className="rounded py-2 px-3 text-white" onClick={confirmHandler} style={{
                    backgroundColor: "#FE3A5E"
                }}>Confirm</button>
            </div>
        </div>
    )
}