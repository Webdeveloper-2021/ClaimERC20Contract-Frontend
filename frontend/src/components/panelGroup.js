import { useState } from 'react';

export const PanelGroup = ({header, children}) => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(oldVal => !oldVal);
    }
    return (
        <div className="border-t-4 border-white">
            <div className="flex justify-between p-4">
                <div className="font-black">{header}</div>
                <div className="cursor-pointer" onClick={toggle}>{open ? "Collapse" : "Expand"}</div>
            </div>
            <div className={`p-4 ${open ? "" : "hidden"}`}>
                {children}
            </div>
            <hr className="border-t-2 border-gray-600" />
        </div>
    )
}