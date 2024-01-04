import { Button, Card } from "react-bootstrap";
import { CurencyFormatter } from "../utilities/currencyFormater";
import { useShoppingCart } from "../context/ShoppingCartConext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imageURL: string;
};

export function StoreItem({ id, name, price, imageURL }: StoreItemProps) {
  const { getItemQty, incressCartQty, decressCartQty, removeFromCart } =
    useShoppingCart();
  const qty = getItemQty(id);

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={imageURL}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{CurencyFormatter(price)} </span>
          </Card.Title>

          <div className="mt-auto">
            {qty === 0 ? (
              <Button className="w-100" onClick={() => incressCartQty(id)}>
                Add to Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button
                    className="btn btn-primary"
                    onClick={() => decressCartQty(id)}
                  >
                    -
                  </Button>
                  <div>
                    <span className="fs-3">{qty} in Cart</span>
                  </div>
                  <Button
                    className="btn btn-primary"
                    onClick={() => incressCartQty(id)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  className="btn btn-primary"
                  onClick={() => removeFromCart(id)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
