﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var URI = "197.45.191.5:780/api/";
    var LanguageIsEnglish = true;
    var MAPS = [
        { 'path': 'Maps/FloorG.svg', 'id': 'floor1' },
        { 'path': 'Maps/Floor1.svg', 'id': 'floor2' },
        { 'path': 'Maps/Floor2.svg', 'id': 'floor3' }
    ];
    var START_ROOM = 'Enter1';
    var DEFAULT_MAP = 'floor1';
    var Eleva1 = "Eleva1";
    var Eleva2 = "Eleva2";
    var Eleva3 = "Eleva3";
    var FloorPra;
    var RoomPra;
    var POINamePra;
    var DestinationText;
    var SearchOption;
    var ENdataSourceRoomNumber;
    var ARdataSourceRoomNumber;
    var ENdataSourceEmployee;
    var ARdataSourceEmployee;
    var ENdataSourceDepartment;
    var ARdataSourceDepartment;
    function onDeviceReady() {
        debugger;



        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        //document.getElementById("btn_ChangeLanguage").addEventListener('ChangeLanguage', onclick.bind(this), false);

        var btnCulture = document.getElementById("btn_ChangeLanguage");
        btnCulture.addEventListener('click', function () { ChangeLanguage(); }, false);

        var btnSearch = document.getElementById("btn_Search");
        btnSearch.addEventListener('click', function () { onSearchClick(); }, false);

        var btnBrowse = document.getElementById("btn_Brows");
        btnBrowse.addEventListener('click', function () { onBrowsClick(); }, false);

        var btnDepartment = document.getElementById("btn_Department");
        btnDepartment.addEventListener('click', function () { onDepartmentClick(); }, false);

        var btnRoomNumber = document.getElementById("btn_RoomNumber");
        btnRoomNumber.addEventListener('click', function () { onRoomNumberClick(); }, false);

        var btnEmployee = document.getElementById("btn_Employee");
        btnEmployee.addEventListener('click', function () { onEmployeeClick(); }, false);

        // #region Search And Close Buttons

        var btnSearchEmployee = document.getElementById("btn_SearchEmployee");
        btnSearchEmployee.addEventListener('click', function () { SearchEmpoyee(); }, false);

        var btnCloseEmployee = document.getElementById("btn_closeEmployee");
        btnCloseEmployee.addEventListener('click', function () { ResetAllwindowPopup(); }, false);

        var btnSearchDepartment = document.getElementById("btn_SearchDepartment");
        btnSearchDepartment.addEventListener('click', function () { SearchDepartment(); }, false);

        var btnCloseDepartment = document.getElementById("btn_closeDepartment");
        btnCloseDepartment.addEventListener('click', function () { ResetAllwindowPopup(); }, false);

        var btnSearchRoomNumber = document.getElementById("btn_SearchRoomNumber");
        btnSearchRoomNumber.addEventListener('click', function () { SearchRoomNumber(); }, false);

        var btnCloseRoomNumber = document.getElementById("btn_closeRoomNumber");
        btnCloseRoomNumber.addEventListener('click', function () { ResetAllwindowPopup(); }, false);

        var btnCloseBrowseRoomNumber = document.getElementById("btn_CloseBrowseRoomNumber");
        btnCloseBrowseRoomNumber.addEventListener('click', function () { ResetAllwindowPopup(); }, false);

        var btnCloseBrowseEmployee = document.getElementById("btn_CloseBrowseEmployee");
        btnCloseBrowseEmployee.addEventListener('click', function () { ResetAllwindowPopup(); }, false);

        var btnCloseBrowseDepartment = document.getElementById("btn_CloseBrowseDepartment");
        btnCloseBrowseDepartment.addEventListener('click', function () { ResetAllwindowPopup(); }, false);

        // #endregion Search And Close Buttons
        
        //Image Buttons

        var imgFloor1 = document.getElementById("img_Floor1");
        imgFloor1.addEventListener('click', function () { ImageFloorGroud(); }, false);

        var imgFloor2 = document.getElementById("img_Floor2");
        imgFloor2.addEventListener('click', function () { ImageFloorOne(); }, false);

        var imgFloor3 = document.getElementById("img_Floor3");
        imgFloor3.addEventListener('click', function () { ImageFloorTow(); }, false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        let Log = $("#LogHeader");

        let ENDataPar = { IsEnglish: true };
        let ARDataPar = { IsEnglish: false };
        ENdataSourceDepartment = CallAjax("Department/GetAllDepartments/", ENDataPar, "20% of Data has been loaded");
        ARdataSourceDepartment = CallAjax("Department/GetAllDepartments/", ARDataPar, "40% of Data has been loaded");

        ENdataSourceEmployee = CallAjax("Department/GetAllEmployees/", ENDataPar, "60% of Data has been loaded");
        ARdataSourceEmployee = CallAjax("Department/GetAllEmployees/", ARDataPar, "80% of Data has been loaded");

        ENdataSourceRoomNumber = CallAjax("Department/GetAllRooms/", ENDataPar, "90% of Data has been loaded");
        ARdataSourceRoomNumber = CallAjax("Department/GetAllRooms/", ARDataPar, "100% of Data has been loaded");

        //#region
        $("#BrowsGridRoom").kendoGrid({
            dataSource: {
                data: ENdataSourceRoomNumber,
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "RoomNumber" },
                        }
                    }
                }
            },
            change: grid_change,
            scrollable: true,
            sortable: true,
            selectable: "row",
            filterable: true,
            columns: [

                { field: "Text", title: "Units In Stock", headerAttributes: { style: "display: none" } },
            ]
        });
        $("#BrowsGridDepartment").kendoGrid({
            dataSource: {
                data: ENdataSourceDepartment,
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                        }
                    }
                }
            },
            change: grid_change,
            scrollable: true,
            detailExpand: function (e) {
                $(".SelectedRow").removeClass("SelectedRow");
                this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                $(".k-i-collapse").closest("tr").addClass("SelectedRow");
            },
            detailInit: detailInit,
            sortable: true,
            selectable: "row",
            filterable: true,
            columns: [

                { field: "Text", headerAttributes: { style: "display: none" } },
            ]

        });
        $("#BrowsGridEmplyee").kendoGrid({
            dataSource: {
                data: ENdataSourceEmployee,
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                        }
                    }
                }
            },
            change: grid_change,
            scrollable: true,
            sortable: true,
            selectable: "row",
            filterable: false,
            columns: [

                { field: "Text", headerAttributes: { style: "display: none" } },
            ]

        });
        //#endregion


        $('#myMaps').wayfinding({
            'maps': MAPS,
            'path': {
                width: 3,
                color: 'red',
                radius: 8,
                speed: 8
            },
            'startpoint': function () { return START_ROOM; },
            'defaultMap': DEFAULT_MAP
        });
        $('#myMaps').wayfinding('accessibleRoute', true);
        Log.append("<br/>" + "Maps has been loaded");
        window.setInterval(function () {
            Log.hide();
        }, 3000);



        var gridDepatment = $("#SearchGridDepartment").kendoGrid({
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                        }
                    }
                }
            },
            detailExpand: function (e) {
                $(".SelectedRow").removeClass("SelectedRow");
                this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                $(".k-i-collapse").closest("tr").addClass("SelectedRow");
            },
            change: grid_change,
            scrollable: true,
            detailInit: detailInit,
            sortable: true,
            selectable: "row",
            filterable: true,
            columns: [

                { field: "Text", headerAttributes: { style: "display: none" } },
            ]

        });
        gridDepatment.hide();

        var gridEmployee = $("#SearchGridEmployee").kendoGrid({
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                        }
                    }
                }
            },
            change: grid_change,
            scrollable: true,
            sortable: true,
            selectable: "row",
            filterable: true,
            columns: [

                { field: "Text", headerAttributes: { style: "display: none" } },
            ]
        });
        gridEmployee.hide();

        var gridRooms = $("#SearchGridRoomnumber").kendoGrid({
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                        }
                    }
                }
            },
            change: grid_change,
            scrollable: true,
            sortable: true,
            selectable: "row",
            filterable: true,
            columns: [

                { field: "Text", headerAttributes: { style: "display: none" } },
            ]
        });
        gridRooms.hide();
        var idleState = false;
        var idleTimer = null;
        $('*').bind('mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick', function () {
            clearTimeout(idleTimer);

            if (idleState == true) {

            }

            idleState = false;
            idleTimer = setTimeout(function () {
                try {
                    ResetAllwindowPopup();
                    ResetFloorImages();
                    $("#div_Options").hide();
                    if (LanguageIsEnglish == false) {
                        $("btn_ChangeLanguage").click();
                    }
                    $('#myMaps').wayfinding('currentMap', 'floor1');
                } catch (e) {

                }

                idleState = true;
            }, 120000);
        });
        $("body").trigger("mousemove");

        $("#BrowsRoomWindow #BrowsGridRoom .k-grid-content").css({
            "overflow-y": "visible !important"
        });

    };

    function ChangeLanguage() {

        ResetAllwindowPopup();
        ResetFloorImages();

        if (LanguageIsEnglish) {
            $('body').addClass('RTL');
            $("[data-English]").each(function () {
                if ($(this).is('input')) {
                    $(this).val($(this).attr('data-Arabic'));
                }
                else {
                    $(this).text($(this).attr('data-Arabic'));
                }
            });
            SetDataToGrid('BrowsGridEmplyee', ARdataSourceEmployee);
            SetDataToGrid('BrowsGridRoom', ARdataSourceRoomNumber);
            SetDataToGrid('BrowsGridDepartment', ARdataSourceDepartment);
            LanguageIsEnglish = false;
        }
        else {
            $('body').removeClass('RTL');
            $("[data-English]").each(function () {
                if ($(this).is('input')) {
                    $(this).val($(this).attr('data-English'));
                }
                else {
                    $(this).text($(this).attr('data-English'));
                }
            });

            SetDataToGrid('BrowsGridEmplyee', ENdataSourceEmployee);
            SetDataToGrid('BrowsGridRoom', ENdataSourceRoomNumber);
            SetDataToGrid('BrowsGridDepartment', ENdataSourceDepartment);
            LanguageIsEnglish = true;
        }


    }

    function GetEmployeeHeader() {
        if (LanguageIsEnglish) {
            return "Employees";
        }
        else {
            return "الموظفين";

        }
    }

    function parseArabic(str) {
        debugger;
        return str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
            return d.charCodeAt(0) - 1632;
        }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
            return d.charCodeAt(0) - 1776;
        });
    }

    function SearchDepartment() {
        // let DepartmentsSearchResultData = CallAjax("Department/GetDepartments", DataPar);
        let GridDepartmentC = $('#SearchGridDepartment').data("kendoGrid");

        if (GridDepartmentC) {
            $('#SearchGridDepartment').show();
            if (LanguageIsEnglish) {
                GridDepartmentC.dataSource.data(ENdataSourceDepartment);
            }
            else {
                GridDepartmentC.dataSource.data(ARdataSourceDepartment);
            }
            GridDepartmentC.dataSource.filter({ field: "Text", operator: "contains", value: parseArabic($('#txt_SearchDepartment').val()) });
        }
        else {
            $('#SearchGridDepartment').hide();
        }
    }
    function SearchEmpoyee() {

        let GridDepartmentC = $('#SearchGridEmployee').data("kendoGrid");
        if (GridDepartmentC) {
            $('#SearchGridEmployee').show();
            if (LanguageIsEnglish) {
                GridDepartmentC.dataSource.data(ENdataSourceEmployee);
            }
            else {
                GridDepartmentC.dataSource.data(ARdataSourceEmployee);
            }
            GridDepartmentC.dataSource.filter({ field: "Text", operator: "contains", value: parseArabic($('#txt_SearchEmployee').val()) });
        }
        else {
            $('#SearchGridEmployee').hide();
        }
    }
    function SearchRoomNumber() {

        let GridDepartmentC = $('#SearchGridRoomnumber').data("kendoGrid");
        if (GridDepartmentC) {
            $('#SearchGridRoomnumber').show();
            if (LanguageIsEnglish) {
                GridDepartmentC.dataSource.data(ENdataSourceRoomNumber);
            }
            else {
                GridDepartmentC.dataSource.data(ARdataSourceRoomNumber);
            }
            GridDepartmentC.dataSource.filter({ field: "Text", operator: "contains", value: parseArabic($('#txt_SearchRoom').val()) });
        } else {
            $('#SearchGridRoomnumber').hide();
        }
    }
    //#endregion

    //#region Ajax

    function CallAjax(ActionPath, JsonPrarmeters, Message) {
        try {
            let Log = $("#LogHeader");
            var Dataresult;

            $.ajax({
                traditional: true,
                url: "http://" + URI + ActionPath,
                async: false,
                dataType: 'json',
                timeout: 120000,
                contentType: "application/json",
                data: JsonPrarmeters,
                success: function (data) {
                    Dataresult = data;
                    Log.append("<br/>" + Message);
                },
                failure: function (response) {
                    alert('Invalid API Connection URL' + URI);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Failed to connect the server ' + URI + " |Error status: " + textStatus);
                }
            });
            return Dataresult;
        } catch (e) {
            alert('Failed to connect the server' + URI);
        }
    }


    function detailInit(e) {

        $('#FlooerNumber').text(e.data.FloorNumber);
        $('#RoomNumber').text(e.data.RoomNumber);
        let TempDate;

        if (LanguageIsEnglish) {
            TempDate = new kendo.data.DataSource({
                data: ENdataSourceEmployee,
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                            DepartmentID: { type: "string" }
                        }
                    }
                }
            });
            console.log(e.data.ID);
            TempDate.filter({ field: "DepartmentID", operator: "eq", value: e.data.ID });

        }
        else {
            TempDate = new kendo.data.DataSource({
                data: ARdataSourceEmployee,
                schema: {
                    model: {
                        fields: {
                            ID: { type: "string" },
                            Text: { type: "string" },
                            DepartmentID: { type: "string" }
                        }
                    }
                }
            });
            console.log(e.data.ID);
            TempDate.filter({ field: "DepartmentID", operator: "eq", value: e.data.ID });
        }

        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: TempDate,
            change: grid_change,
            scrollable: true,
            selectable: "row",
            sortable: true,
            filterable: false,
            columns: [
                { field: "Text", title: GetEmployeeHeader() }
            ]
        }).addClass("SubGrid");


        //console.log( e.detailCell.wrapper.attr('data-uid'));

    }
    function grid_change(e) {
        var selectedItem = this.dataItem(this.select());
        FloorPra = selectedItem.FloorNumber;
        RoomPra = selectedItem.RoomNumber.toString();
        POINamePra = selectedItem.POIName;
        DestinationText = selectedItem.Text.toString();
        RoutMap();

    }

    function RoutRoom(e) {
        var RoomNumber = $("#txt_SearchRoomnumber").val();
        let DataPar = { SearchKey: RoomNumber, IsEnglish: LanguageIsEnglish };
        let RoomsResultData = CallAjax("Department/GetRoomNumber/", DataPar);
        if (RoomsResultData) {
            FloorPra = RoomsResultData.FloorNumber;
            RoomPra = RoomsResultData.RoomNumber.toString();
            POINamePra = RoomsResultData.POIName;
            DestinationText = RoomsResultData.Text.toString();
            RoutMap();
        }
        else {
            alert('Sorry the room not exist');
        }

    }
    function RoutMap() {
        $('#myMaps').wayfinding('currentMap', 'floor1');
        $("#myMaps").wayfinding('startpoint', START_ROOM);
        ShowHideSearchArea();
        ResetFloorImages();
        $("[fill*='red']").attr('fill', 'none');
        $("#div_Options").hide();

        if (LanguageIsEnglish) {
            switch (FloorPra) {
                case 1:
                    $("#FlooerNumber").text("Ground Floor");
                    break;
                case 2:
                    $("#FlooerNumber").text("First Floor");
                    break;
                case 3:
                    $("#FlooerNumber").text("Second Floor");
                    break
                default:

            }
        }
        else {
            switch (FloorPra) {
                case 1:
                    $("#FlooerNumber").text("الطابق الأرضي");
                    break;
                case 2:
                    $("#FlooerNumber").text("الطابق الأول");
                    break;
                case 3:
                    $("#FlooerNumber").text("الطابق الثانى");
                    break
                default:

            }
        }


        $("#RoomNumber").text(POINamePra);
        $("#DestinationName").text(DestinationText);

        $("#RoutInformationFloor").show();
        $("#RoutInformationRoom").show();
        $("#destinationTitle").show();
        $("#DestionationTitleLabel").show();

        $("#FlooerContainer1").addClass('ImageSelectedBorder');

        if (FloorPra == 1) {
            $("#FlooerContainer1").show();
            $('#myMaps').wayfinding('routeTo', 'D' + RoomPra);
            $('#O' + RoomPra).attr('fill', 'red');
        }
        else if (FloorPra == 2) {
            $("#FlooerContainer1").show();
            $("#FlooerContainer2").show();
            $('#myMaps').wayfinding('routeTo', Eleva1);
            setTimeout(function () {
                $("#FlooerContainer1").removeClass('ImageSelectedBorder');
                $("#FlooerContainer2").addClass('ImageSelectedBorder');
                $("#myMaps").wayfinding('startpoint', Eleva2);
                $('#myMaps').wayfinding('currentMap', 'floor2');
                $('#O' + RoomPra).attr('fill', 'red');
                $('#myMaps').wayfinding('routeTo', 'D' + RoomPra);

            }, 8000);
        }
        else if (FloorPra == 3) {
            $("#FlooerContainer1").show();
            $("#FlooerContainer3").show();
            $('#myMaps').wayfinding('routeTo', Eleva1);
            setTimeout(function () {
                $("#FlooerContainer1").removeClass('ImageSelectedBorder');
                $("#FlooerContainer3").addClass('ImageSelectedBorder');
                $("#myMaps").wayfinding('startpoint', Eleva3);
                $('#myMaps').wayfinding('currentMap', 'floor3');
                $('#O' + RoomPra).attr('fill', 'red');
                $('#myMaps').wayfinding('routeTo', 'D' + RoomPra);
            }, 8000);
        }

    }
    function ImageFloorGroud() {
        $('#myMaps').wayfinding('currentMap', 'floor1');
        $("#myMaps").wayfinding('startpoint', START_ROOM);
        $("#FlooerContainer3").removeClass('ImageSelectedBorder');
        $("#FlooerContainer2").removeClass('ImageSelectedBorder');
        $("#FlooerContainer1").addClass('ImageSelectedBorder');
        if (FloorPra == 1) {
            $('#myMaps').wayfinding('routeTo', 'D' + RoomPra);
            $('#O' + RoomPra).attr('fill', 'red');
        }
        else {
            $('#myMaps').wayfinding('routeTo', 'Eleva1');
        }


    }
    function ImageFloorOne() {
        $('#myMaps').wayfinding('currentMap', 'floor2');
        $("#myMaps").wayfinding('startpoint', Eleva2);
        $("#FlooerContainer3").removeClass('ImageSelectedBorder');
        $("#FlooerContainer1").removeClass('ImageSelectedBorder');
        $("#FlooerContainer2").addClass('ImageSelectedBorder');
        if (FloorPra == 2) {
            $('#myMaps').wayfinding('routeTo', 'D' + RoomPra);
            $('#O' + RoomPra).attr('fill', 'red');
        }
        else {
            $('#myMaps').wayfinding('routeTo', Eleva2);
        }
    }
    function ImageFloorTow() {
        $('#myMaps').wayfinding('currentMap', 'floor3');
        $("#myMaps").wayfinding('startpoint', Eleva3);
        $("#FlooerContainer2").removeClass('ImageSelectedBorder');
        $("#FlooerContainer1").removeClass('ImageSelectedBorder');
        $("#FlooerContainer3").addClass('ImageSelectedBorder');
        $('#myMaps').wayfinding('routeTo', 'D' + RoomPra);
        $('#O' + RoomPra).attr('fill', 'red');

    }
    //#endregion



    function ResetFloorImages() {
        $("#RoutInformationFloor").hide();
        $("#RoutInformationRoom").hide();
        $("#destinationTitle").hide();
        $("#DestionationTitleLabel").hide();

        $("#FlooerContainer1").hide();
        $("#FlooerContainer1").removeClass('ImageSelectedBorder');

        $("#FlooerContainer2").hide();
        $("#FlooerContainer2").removeClass('ImageSelectedBorder');

        $("#FlooerContainer3").hide();
        $("#FlooerContainer3").removeClass('ImageSelectedBorder');


    }

    function ResetAllwindowPopup() {
        $('#SearchDepartmentWindow').fadeOut('fast');
        $('#SearchEmplyeewindow').fadeOut('fast');
        $('#SearchRoomtWindow').fadeOut('fast');
        $('#BrowsRoomWindow').fadeOut('fast');
        $('#BrowsEmplyeeWindow').fadeOut('fast');
        $('#BrowsDepartmentWindow').fadeOut('fast');
        $('#SearchGridRoomnumber').data("kendoGrid").dataSource.data([]);
        $('#SearchGridEmployee').data("kendoGrid").dataSource.data([]);
        $('#SearchGridDepartment').data("kendoGrid").dataSource.data([]);
        $('#txt_SearchEmployee').val("");
        $('#txt_SearchDepartment').val("");
        $('#txt_SearchRoom').val("");
        $("#myMaps").wayfinding('startpoint', START_ROOM);
        $('#myMaps').wayfinding('currentMap', 'floor1');


    }
    //#region Button

    // search button
    function onSearchClick() {
        $("#div_Options").fadeOut('slow');
        $("#div_Options").fadeIn('slow');
        ResetFloorImages();
        ResetAllwindowPopup();
        SearchOption = true;
        $(".SelectedButton").removeClass("SelectedButton");
        $("#btn_Search").addClass("SelectedButton");
    }
    //Brows Button 
    function onBrowsClick() {
        $("#div_Options").fadeOut('slow');
        $("#div_Options").fadeIn('slow');
        ResetFloorImages();
        ResetAllwindowPopup();
        SearchOption = false;
        $(".SelectedButton").removeClass("SelectedButton");
        $("#btn_Brows").addClass("SelectedButton");
    }
    // Brows 
    function onDepartmentClick() {
        ResetFloorImages();
        if (SearchOption) {
            ShowHideSearchArea('#SearchDepartmentWindow');
        }
        else {
            ShowHideSearchArea('#BrowsDepartmentWindow');
        }

    }
    function onEmployeeClick() {
        ResetFloorImages();
        if (SearchOption) {
            ShowHideSearchArea('#SearchEmplyeewindow');
        }
        else {
            ShowHideSearchArea('#BrowsEmplyeeWindow');
        }
    }
    function onRoomNumberClick() {
        ResetFloorImages();
        if (SearchOption) {
            ShowHideSearchArea('#SearchRoomtWindow');
        }
        else {
            ShowHideSearchArea('#BrowsRoomWindow');
        }


    }

    function ShowHideSearchArea(DivID) {

        ResetAllwindowPopup();
        var Window = $(DivID);
        if (Window) {
            if (Window.is(":visible")) {
                Window.fadeOut('slow');
                //$(".MapContainer").css("opacity", "0.5");
            }
            else {
                Window.fadeIn('slow');
                //$(".MapContainer").css("opacity", "1");
            }
        }

    }

    function ShowHideWithAnimation(DivID) {
        var Window = $(DivID);
        ResetAllwindowPopup();
        if (Window.is(":visible")) {
            //Window.slideUp('slow');
            Window.fadeOut('slow');
        }
        else {
            Window.fadeIn('slow');
        }
    }
    function SetDataToGrid(GridID, Data) {
        let Grid = $('#' + GridID).data("kendoGrid");
        Grid.dataSource.data(Data);
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();