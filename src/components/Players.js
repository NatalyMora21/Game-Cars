
const Players =({id, name, won=0}) => {

    return (
        <>
          <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{won}</td>
          </tr>


        </>)
}


export default Players;