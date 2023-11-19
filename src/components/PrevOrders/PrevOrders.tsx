import { useEffect, useState } from 'react';
import useTelegram from '../../hooks/useTelegram';


const PrevOrders = () => {

    const [orders,setOrders] = useState('None')

    useEffect(() => {
        const fetchOrders = async () => {
        try{    await fetch('http://localhost:8000/userInfo',{method:'POST',body:JSON.stringify(tg.initDataUnsafe.id)}).then((orders) => orders.json()).then((jsonOrder) => setOrders(jsonOrder))}
        catch(e){
            console.log(e)
        }
        }

     fetchOrders()
    },[])

const {tg} = useTelegram() 
    return <div>
        {JSON.stringify(orders)}
    </div>
}

export default PrevOrders