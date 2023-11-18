import useTelegram from '../../hooks/useTelegram';

const PrevOrders = () => {

const {tg} = useTelegram() 
    return <div>
        {JSON.stringify(tg.initDataUnsafe)}
    </div>
}

export default PrevOrders