    import QRCode from 'qrcode';

   // Method for print ID card
    export const openWin =(user,  generatedQR) => {
        let briefInfo;
        let userName = user.firstName + ' ' + user.lastName;
        let CompanyName = '';
        let attendeeLabel = '';
        let attendeeCount = '';
        let attendeeCode = ''
        if (user.attendeeLabel)
            attendeeLabel = user.attendeeLabel;
        if (user.attendeeCount)
            attendeeCount = user.attendeeCount;
        attendeeCode = attendeeLabel + "-" + attendeeCount;
        if (user.briefInfo != undefined) {
            briefInfo = user.briefInfo;
            CompanyName = briefInfo.split('\n')[0];
        }
        else {
            CompanyName = '';
        }

        var newWindow = window.open('', '', 'width=1000,height=1000');
        setTimeout(() => newWindow.document.title = '' + attendeeCode + '', 0);
        newWindow.document.writeln("<html>");
        newWindow.document.writeln("<body>");
        newWindow.document.write("<div style='width:4in;height:5in;text-align:center;margin-left:0;margin-top:0;'>")
        newWindow.document.write("<div style='height:100%;'>")
        //layer1
        newWindow.document.write("<div style='height:29%;'> </div>")
        //layer2
        newWindow.document.write("<div style='margin-top:30px;padding: 0 30px;max-height:150px;height:150px;margin-left:-15px;'><h1 style='font-size: 2.2rem;font-family:'Arial';padding: 10px 0 0 0;margin-top:40px;margin-bottom:-10px;'>" + userName + "</h1>")
        newWindow.document.write("<p style='margin-top:-16px;font-size: 1.5rem;font-family:'Avenir-Book';'>" + CompanyName + "</p>")
        //newWindow.document.write("<p style='margin-top:-16px;font-size: 1.5rem;font-family:'Avenir-Book';'>MarketAxis Consulting</p>")
        newWindow.document.write("</div>")
        //layer2a
        newWindow.document.write("<div style='text-align: left;padding: 30px 30px;padding-bottom:0;margin-top:-20px;position:fixed;'>")
        newWindow.document.write("<img style='width:90px;height:90px;margin-left:-14px;margin-bottom:-4px;' src='" + generatedQR + "'/>")
        newWindow.document.write("<div style='text-align:left;font-weight:bold;font-size:13px;font-family:'Arial';margin-top:-4px;padding: 0 0px;padding-right:0px;padding-left:50px;'>" + attendeeCode + "</div> <br/>")
        newWindow.document.write("</div>")
        //layer3
        newWindow.document.write("<div style='border-left:1px solid #666;border-right:1px solid #666;'>")
        newWindow.document.write("</div>")
        newWindow.document.write("</div>")
        newWindow.document.write("</div>")
        newWindow.document.writeln("</body></html>");
        newWindow.document.close();

        setTimeout(function () {
            newWindow.print();
            newWindow.close();
        }, 500);
    }

    // Method for generate QR code
    export const onGenerateQRcode = (user) =>{
        let generatedQR;
        let compRef = this;
        let id = user._id;
        let userName = user.firstName +''+ user.lastName;
        let Label = user.attendeeLabel
        let Count = user.attendeeCount;
        let AttendeeCode = Label + "-" + Count;
        QRCode.toDataURL("TIE" + ":" + AttendeeCode + ":" + id + ":" + userName)
            .then(url => {
                generatedQR = url;
                setTimeout(() => {
                  openWin(user, generatedQR);
                }, 250);
            })
    }