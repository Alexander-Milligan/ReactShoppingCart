import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItems";
import storedata from "../data/storedata.json";

function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-4">
        {storedata.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Store;
