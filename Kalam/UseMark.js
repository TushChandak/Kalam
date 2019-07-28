nsUserFunctions = {
    mark: function () {

        // Read the keyword
        var keyword = $("input[name='keyword']").val();

        // Determine selected options
        var options = {};
        $("input[name='opt[]']").each(function () {
            options[$(this).val()] = $(this).is(":checked");
        });

        // Remove previous marked elements and mark
        // the new keyword inside the context
        $(".context").unmark({
            done: function () {
                $(".context").mark(keyword, options);
            }
        });
    },
    ApplyCursor: function () {
        $('body').addClass("Markcursor");
    },
    ApplyMouseUp: function () {
        
        nsUserFunctions.ApplyCursor();
        $("div").mouseup(
            function () {
                var selection = nsUserFunctions.getSelectedText();
                console.log(selection);
                if (selection.length >= 3) {
                    $("div").unmark({
                        done: function () {
                            $("div").mark(selection, {
                                separateWordSearch: false,
                                done: function () {

                                    currentIndex = 0;
                                }
                            });
                        }
                    });
                    console.log(selection);
                }
            }
        );

        //$('body').mouseup(
        //    function () {
        //        var selection = nsUserFunctions.getSelectedText();
        //        if (selection.length >= 3) {


        //            $("div").mark(selection);
        //            console.log(selection);
        //            chrome.storage.local.get(['HighLighter'], function (result) {
        //                HighLighter = result.key;                      
        //            });
        //        }
        //    }
        //);
        nsUserFunctions.GetContextMenu();
    },

  //Grab selected text
    getSelectedText: function () {
        if (window.getSelection) {
            return window.getSelection().toString();
        }
        else if (document.getSelection) {
            return document.getSelection();
        }
        else if (document.selection) {
            return document.selection.createRange().text;
        }
    },

    removeMarkEvent: function () {
        $('body').unbind('mouseup');
        $('body').removeClass('MarkCursor');
    },
    GetContextMenu: function () {


        $('body').contextMenu({
            selector: 'div',
            callback: function (key, options) {
                var m = "clicked: " + key + " on " + $(this).text();
                window.console && console.log(m) || alert(m);
            },
            items: {
                "Send URL": { name: "Send URL", icon: "Send" },
                "Copy Text": { name: "Copy Text", icon: "Copy" },
                "Paste Text": { name: "Paste Text", icon: "Paste" },
                "Add Comments": { name: "Add Comments", icon: "Comment" },              
                "Quit": { name: "Quit", icon: function ($element, key, item) { return 'context-menu-icon context-menu-icon-quit'; } }
            }
        });
        
        $('.context-menu-one').on('click', function (e) {
            if (this == "Send") {
                console.log('clicked', this);
                if (tab.url.indexOf("http:") != 0 &&
                    tab.url.indexOf("https:") != 0) {
                    executeMailto(tab.id, "", tab.url, "");
                } else {
                    chrome.tabs.executeScript(null, { file: "content_script.js" });
                }
            }
            
            
        })
    },
    
    
};





 