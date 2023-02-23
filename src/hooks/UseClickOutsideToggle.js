import { useEffect, useRef, useState } from "react";

const UseClickOutToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOut = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOut);
    return () => {
      document.removeEventListener("mouseup", handleClickOut);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default UseClickOutToggle;
