import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartConext";
import storeItems from "../data/storedata.json";
import { CurencyFormatter } from "../utilities/currencyFormater";

type CartItemProps = {
  id: number;
  qty: number;
};

export function CartItem({ id, qty }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src={item.imageURL}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {qty > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{qty}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {CurencyFormatter(item.price)}
        </div>
        <div>{CurencyFormatter(item.price * qty)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          X
        </Button>
      </div>
    </Stack>
  );
}
