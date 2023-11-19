import { useEffect, useState } from 'react';
import useTelegram from '../../hooks/useTelegram';


const PrevOrders = () => {

    const [orders,setOrders] = useState('None')

    useEffect(() => {
        const fetchOrders = async () => {
        try{    await fetch('https://633211c53ea4956cfb6c6c0f.mockapi.io/items').then((orders) => orders.json()).then((jsonOrder) => setOrders(jsonOrder))}
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