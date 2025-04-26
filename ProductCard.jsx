import cart from "../Images/shopping-basket.png";

export default function ProductCard(props) {
    return (
        <div class="card">
            <div className="Productcardbox">
                <img 
                    src={props.img} 
                    alt={props.altText || "Product image"} 
                    className="productImage" 
                />

                <div className="descriptionAndCta">
                    <div className="productDescription">
                        <div className="productInformation">
                            <img src={props.companyLogo} alt="Manufacturer logo"/>
                            <h2>{props.productName}</h2>
                            <a 
                                className="companyManufacturedBy" 
                                href={props.companyWebsite} 
                                rel="noreferrer" 
                                target="_blank"
                            >
                                {props.companyName}
                            </a>
                        </div>

                        <div className="itemDescription">
                            <p>{props.productDescription}</p>
                        </div>
                    </div>

                    <button className="btn">
                        <img src={cart} alt="Cart icon"/> 
                        <div className="btnSection">
                            <span>Buy Now </span>
                            <span class="pricetag">{props.price}</span>
                        </div>
                    </button>
                </div>
                
            </div>
           
        </div>
    );
}
