import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

function RoomCard({ room }) {
  const [personCount, setPersonCount] = useState(1);
  const [dayCount, setDayCount] = useState(1);
  const [price, setPrice] = useState(room.price);
  const [totalBill, setTotalBill] = useState(5);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (dayCount <= 0) setDayCount(1);
    if (personCount <= 0) setPersonCount(1);

    setTotalBill(personCount * dayCount * price);
  }, [personCount, dayCount, price]);

  return (
    <Card className="room-card mb-5">
      <Card.Img style={{ maxHeight: "200px" }} src={`/rooms/${room.photo}`} />
      <Card.Body>
        <h4>{room.name}</h4>
        <p className="pricing text-muted">
          ${price}.00 (1 person) - <span className="font-weight-bold text-c-primary">Per Day</span>
        </p>

        <Card className="mb-2 p-2 card-in-room">
          <small className="mb-2">
            Total : <span className="font-weight-bold">${totalBill}.00</span>
          </small>
          <div className="input-group input-group-sm mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">{personCount} Person : </span>
            </div>
            <input type="button" value="+" className="form-control" onClick={() => setPersonCount(personCount + 1)} />
            <input type="button" value="-" className="form-control" onClick={() => setPersonCount(personCount - 1)} />
          </div>

          <div className="input-group input-group-sm mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text">{dayCount} Day : </span>
            </div>
            <input type="button" value="+" className="form-control" onClick={() => setDayCount(dayCount + 1)} />
            <input type="button" value="-" className="form-control" onClick={() => setDayCount(dayCount - 1)} />
          </div>

          <div className="input-group input-group-sm mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Start Date</span>
            </div>
            <DatePicker
              className="form-control form-control-sm"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </Card>

        <Link to={`/booking/${room.id}`} className="btn btn-c-primary btn-sm">
          Book now
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RoomCard;
