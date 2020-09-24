var latlonginput = {
generateLatitudeInputWithLabel(value,id,includeSmall){
    var html = "<label>Latitude</label>";
    html += latlonginput.generateLatitudeInput(value,id,includeSmall)
    return html
},
generateLongitudeInputWithLabel(value,id,includeSmall){
    var html = "<label>Longitude</label>";
    html += latlonginput.generateLongitudeInput(value,id,includeSmall)
    return html
},
get_formatted_latitude(lat){
    var result = {number:"",side:""}
    result.side = "N";
    if(lat < 0){
        result.side = "S";
    }
    var abs_lat = Math.abs(lat);
    result.display = {deg:"",min:"",sec:""}
    result.deg = Math.floor(abs_lat);
    var remainder = 60 * (abs_lat - result.deg)
    result.min = Math.floor(remainder)
    result.sec = ((remainder - result.min) * 60)
    result.number = Math.abs(Math.round(lat*100)/100);   

    if(result.sec > 59.99999){
        result.sec = 0;
        result.min += 1;
    }



    result.deg = latlonginput.format_two_digit(result.deg)
    result.min = latlonginput.format_two_digit(result.min)
    result.sec = latlonginput.format_two_digit(result.sec)

    result.number = Math.abs(Math.round(lat*100)/100);   
    return result 
},

get_formatted_longitude(lon){
    var result = {number:"",side:""}
    result.side = "E";
    if(lon < 0){
        result.side = "W";
    }
    var abs_lon = Math.abs(lon);
    result.display = {deg:"",min:"",sec:""}
    result.deg = Math.floor(abs_lon);
    var remainder = 60 * (abs_lon - result.deg)
    result.min = Math.floor(remainder)
    result.sec = ((remainder - result.min) * 60)

    if(result.sec > 59.99999){
        result.sec = 0;
        result.min += 1;
    }

    result.number = Math.abs(Math.round(lon*100)/100);   

    result.deg = latlonginput.format_three_digit(result.deg)
    result.min = latlonginput.format_two_digit(result.min)
    result.sec = latlonginput.format_two_digit(result.sec)
    return result 
},
format_two_digit(number){
    if(number == 0)
        return "00"
    else if(number < 10)
        return "0" + number;
    else
        return number;
},
format_three_digit(number){
    if(number < 10)
        return "00" + number;
    else if(number < 100)
        return "0" + number
    else
        return number;
},
setLatitudeInput(lat,id){
    $("[data-id='"+id+"'][name='latInputStart']").val(Math.abs(lat));

    if(lat < 0)
        $("[data-id='"+id+"'][name='latInputEnd']").html("S")
    else
        $("[data-id='"+id+"'][name='latInputEnd']").html("N")
},
setLongitudeInput(lon,id){
    $("[data-id='"+id+"'][name='lonInputStart']").val(Math.abs(lon));

    if(lon < 0)
        $("[data-id='"+id+"'][name='lonInputEnd']").html("S")
    else
        $("[data-id='"+id+"'][name='lonInputEnd']").html("N")
},
generateLatitudeInput(lat,id,includeSmall){
    var format_lat = this.get_formatted_latitude(lat)
    var html = '<div class="input-group">'
        html += "<input value='"+format_lat.number+"' data-id='"+id+"' oninput=latlonginput.update_lat_small('"+id+"') name='latInputStart' type='text' class='form-control' aria-label='Text input with dropdown button'>"
        html += '<div class="input-group-append">'
            html += '<button name="latInputEnd" data-id="'+id+'" class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+format_lat.side+'</button>'
            html += '<div class="dropdown-menu">'
                html += "<a class='dropdown-item' onclick=latlonginput.changeLatEnd('N','"+id+"')>N</a>"
                html += "<a class='dropdown-item' onclick=latlonginput.changeLatEnd('S','"+id+"')>S</a>"
            html += '</div>'
        html += '</div>'
        
    html += '</div>'
    if(includeSmall)
        html += "<small data-id='"+id+"' name='lat_small'></small>";
    else
        html += "<small hidden data-id='"+id+"' name='lat_small'></small>";
    return html;

},

generateLongitudeInput(lon,id,includeSmall){
    var format_lon = this.get_formatted_longitude(lon)
    var html = '<div class="input-group">'
        html += "<input value='"+format_lon.number+"' data-id='"+id+"' oninput=latlonginput.update_lon_small('"+id+"') name='lonInputStart' type='text' class='form-control' aria-label='Text input with dropdown button'>"
        html += '<div class="input-group-append">'
            html += '<button name="lonInputEnd" data-id="'+id+'" class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+format_lon.side+'</button>'
            html += '<div class="dropdown-menu">'
                html += "<a class='dropdown-item' onclick=latlonginput.changeLonEnd('W','"+id+"')>W</a>"
                html += "<a class='dropdown-item' onclick=latlonginput.changeLonEnd('E','"+id+"')>E</a>"
            html += '</div>'
        html += '</div>'
    html += '</div>'
    if(includeSmall)
        html += "<small data-id='"+id+"' name='lon_small'></small>";
    else
        html += "<small hidden data-id='"+id+"' name='lon_small'></small>";
    return html;

},

update_lat_small(id){
    var lat = latlonginput.getLatitude(id);
    var selector = $("[data-id='"+id+"'][name='lat_small']")
    if((""+lat).includes("Invalid Input")){
        $(selector).html(lat)
        return
    }
    var format = (latlonginput.get_formatted_latitude(lat))
    $(selector).html(format.deg + " " + format.min + " " + latlonginput.format_two_digit(Math.round(100*format.sec)/100) + " " + format.side)

},
update_lon_small(id){
    var lon = latlonginput.getLongitude(id);
    var selector = $("[data-id='"+id+"'][name='lon_small']")
    if((""+lon).includes("Invalid Input")){
        $(selector).html(lon)
        return
    }
    var format = (latlonginput.get_formatted_longitude(lon))
    $(selector).html(format.deg + " " + format.min + " " + latlonginput.format_two_digit(Math.round(100*format.sec)/100) + " " + format.side)

},
getLatitude(id){
    var lat = parseFloat($("[data-id='"+id+"'][name='latInputStart']").val().replace(/[^0-9.]/g, ""));
    var round_lat = Math.floor(lat) + "";
    var remainder_lat = lat % 1
    var deg = 0;
    var min = 0;
    var sec = 0;
    if(round_lat.length == 6){
        deg = round_lat.slice(0,2)
        min = round_lat.slice(2,4)
        sec = parseFloat(round_lat.slice(4,6)) + parseFloat(remainder_lat)
    }
    else if(round_lat.length == 5){
        deg = round_lat.slice(0,1)
        min = round_lat.slice(1,3)
        sec = parseFloat(round_lat.slice(3,5)) + parseFloat(remainder_lat)
    }
    else if(round_lat.length == 4){
        deg = round_lat.slice(0,2)
        min = parseFloat(round_lat.slice(2,4)) + parseFloat(remainder_lat)
    }    
    else if(round_lat.length == 3){
        deg = round_lat.slice(0,1)
        min = parseFloat(round_lat.slice(1,3)) + parseFloat(remainder_lat)
    }    
    else if(round_lat.length <= 2){
        deg = parseFloat(round_lat) + parseFloat(remainder_lat)
    }   
    if(round_lat.length > 6){
        return "Invalid Input: Too Long";
    }
    lat = parseFloat(deg) + parseFloat(min)/60 + parseFloat(sec)/60/60
    if(lat > 90 || deg > 90 || min >= 60 || sec >= 60){
        return "Invalid Input: Value too large"
    }
    

    if($("[data-id='"+id+"'][name='latInputEnd']").html() == "S")
        lat *= -1;
    return lat;

},
getLongitude(id){
    var lon = parseFloat($("[data-id='"+id+"'][name='lonInputStart']").val().replace(/[^0-9.]/g, ""));
    var round_lon = Math.floor(lon) + "";
    var remainder_lon = lon % 1
    var deg = 0;
    var min = 0;
    var sec = 0;
    if(round_lon.length == 7){
        deg = round_lon.slice(0,3)
        min = round_lon.slice(3,5)
        sec = parseFloat(round_lon.slice(5,7)) + parseFloat(remainder_lon)
    }
    else if(round_lon.length == 6){
        deg = round_lon.slice(0,2)
        min = round_lon.slice(2,4)
        sec = parseFloat(round_lon.slice(4,6)) + parseFloat(remainder_lon)
    }
    else if(round_lon.length == 5){
        deg = round_lon.slice(0,3)
        min = parseFloat(round_lon.slice(3,5)) + parseFloat(remainder_lon)
    }
    else if(round_lon.length == 4){
        deg = round_lon.slice(0,2)
        min = parseFloat(round_lon.slice(2,4)) + parseFloat(remainder_lon)
    }    
    else if(round_lon.length <= 3){
        deg = parseFloat(round_lon) + parseFloat(remainder_lon)
    }      
    if(round_lon.length > 7){
        return "Invalid Input: Too Long";
    }
    lon = parseFloat(deg) + parseFloat(min)/60 + parseFloat(sec)/60/60
    if(lon > 180 || deg > 180 || min >= 60 || sec >= 60){
        return "Invalid Input: Value too large"
    }
    
    if($("[data-id='"+id+"'][name='lonInputEnd']").html() == "W")
        lon *= -1;
    return lon;
},
changeLonEnd(end,id){
    $("[data-id='"+id+"'][name='lonInputEnd']").html(end)
    latlonginput.update_lon_small(id)
},
changeLatEnd(end,id){
    $("[data-id='"+id+"'][name='latInputEnd']").html(end)
    latlonginput.update_lat_small(id)

},

get_position(id){
    var pos = {lat:"",long:""}
    pos.lat = latlonginput.getLatitude(id);
    pos.long = latlonginput.getLongitude(id);
    return pos
}
}
