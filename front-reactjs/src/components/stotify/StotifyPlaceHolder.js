function StotifyPlaceHolder({type}) {
    const indexArray = [1, 2, 3, 4, 5]
    const renderedPlaceHolder = indexArray.forEach((item) => {
        <tr key={item}>
            <td className="rank">{item}</td>
            <td><img className="track_img" style={{ background: '#111111' }}/></td>
            <td><b>...</b>{type === "track" && <><br />de ...</> }</td>
        </tr>
    })
    return (
            <>{renderedPlaceHolder}</>
    )
}

export default StotifyPlaceHolder