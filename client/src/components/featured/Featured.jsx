import "./featured.css"

const Featured = () => {
  return (
    <div className="featured">
        <div className="featuredItem">
            <img src="https://dandg.azureedge.net/cache/2/2/5/7/f/a/2257fa9015c73278d8fa06c2ce23f2df6d5531c4.jpg" alt="" className="featuredImg"/>
            <div className="featuredTitles">
                <h1>London</h1>
                <h2>3 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://wallpaperaccess.com/full/203323.jpg" alt="" className="featuredImg"/>
            <div className="featuredTitles">
                <h1>Paris</h1>
                <h2>3 properties</h2>
            </div>
        </div>

        <div className="featuredItem">
            <img src="https://www.ncirl.ie/portals/0/Images/650x366-Cards-Teasers-Inners/Dublin%20city%20centre%201.jpg" alt="" className="featuredImg"/>
            <div className="featuredTitles">
                <h1>Dublin</h1>
                <h2>3 properties</h2>
            </div>
        </div>

        <div className="featuredItem">
            <img src="https://cdn.britannica.com/93/94493-050-35524FED/Toronto.jpg" alt="" className="featuredImg"/>
            <div className="featuredTitles">
                <h1>Toronto</h1>
                <h2>3 properties</h2>
            </div>
        </div>
    </div>
  )
}

export default Featured