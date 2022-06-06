function StotifyTopItem(props) {
    const { top, rank, type } = props
    let desc;
    if (type === "artists") {
        desc = <></>
    } else {
        desc = <><br />de {top.artist}</>
    }

    return (
        <tr>
            <td><img className="track_img" src={top.img} /></td>
            <td className="rank">{rank}</td>
            <td><b>{top._id}</b>{desc}</td>
            <td className="stotify-table-fois-container">
                <div className="stotify-table-fois-inner-container">
                    <a className="stotify-table-number">{top.count}</a>
                    <a className="stotify-table-fois">{top.count > 1 ? "times" : "time"}</a>
                </div>
            </td>
        </tr>
    )
}

export default StotifyTopItem