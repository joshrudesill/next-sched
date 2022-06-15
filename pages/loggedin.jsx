import { useEffect, useState } from "react"

export default function LoggedIn() {
    const [t, setT] = useState('waiting')
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:8080/dashboardlogin')
            const d = await response.json();
            setT(d.st)
        }
        getData();
    },[])
    return(
        <div>{t}</div>
    )
}