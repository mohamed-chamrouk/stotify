function SpotifyStatsItem(props) {
    const { top, type } = props
    let desc;
    if (type === "artist") {
        desc = <></>
    } else {
        desc = <><br />de {top.artist}</>
    }

    return (
        <tr href={top.link}>
            <td><img className="track_img" src={top.image} /></td>
            <td className="rank">{top.id + 1}</td>
            <td><b>{top.name}</b>{desc}</td>
        </tr>
    )
}

export default SpotifyStatsItem