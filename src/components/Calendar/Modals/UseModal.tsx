import { useState } from "react";

function UseModal() {
 const [isOpen, setIsOpen] = useState(false);

 const toggle = () => {
    setIsOpen(!isOpen);
 }
 return {
    isOpen,
    toggle
 }
}

export default UseModal