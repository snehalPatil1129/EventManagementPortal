import React,{Component} from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
let sessionTypes = [
    {type:"breakout", color:"#FFFF00"},
    {type:"deepdive", color:"#FFFF00"},
    {type:"keynote", color:"#FFFF00"},
    {type:"panel", color:"#FFFF00"},
]

class SessionTypeIndicator extends Component{
    render(){
        console.log(sessionTypes)
        //style={{ backgroundColor: ColorCode }}
        return (
            <div className="animated fadeIn" style={{ backgroundColor:"#928785"}}>
              <Card className="mx-6" style={{ backgroundColor:"#928785"}}>
                    <CardBody
                      style={{ fontWeight: "bold", fontSize: 4 }}
                      className="p-4"
                    >
              {
            sessionTypes.map((sessionType, index) => {
            return (
              <Row key={index} className="justify-content-left">
                <div style={{ backgroundColor: sessionType.color }}>
                 <h6>heyy</h6>
                </div>
              </Row>
            );
          })}
          </CardBody>
                  </Card>
            </div>
          );
    }
};

export default SessionTypeIndicator;
