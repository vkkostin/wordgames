import axios from "axios";

const URL = 'https://edovo-gpt-3d22912cfd6d.herokuapp.com'

const Edovo = () => {

    const onClick = async () => {
        const data = await axios.get(`${URL}/api/api_key`);
        console.log(data);
    }


    return (
        <div>
            <h1>HELLO EDOVO</h1>
            <button onClick={onClick}>GET API KEY</button>
        </div>
    )
}

export default Edovo;
