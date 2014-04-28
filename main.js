/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

// Re-indent the open document according to your current indentation settings.
define(function (require, exports, module) {
    "use strict";

    var CommandManager     = brackets.getModule("command/CommandManager"),
        EditorManager      = brackets.getModule("editor/EditorManager"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        Menus              = brackets.getModule("command/Menus"),
        COMMAND_ID         = "indentator.autoIndent";

    function autoIndent() {
        // Get the editor and document.
        var editor = EditorManager.getFocusedEditor(),
            codeMirror = editor._codeMirror;

        // Update the editor with the current indent settings.
        codeMirror.setOption("indentUnit", PreferencesManager.get("spaceUnits"));
        codeMirror.setOption("tabSize", PreferencesManager.get("tabSize"));
        codeMirror.setOption("indentWithTabs", PreferencesManager.get("useTabChar"));

        // Indent each line of the document.
        codeMirror.eachLine(function (line) {
            codeMirror.indentLine(line.lineNo(), "smart");
        });
    }

    CommandManager.register("Indent Document", COMMAND_ID, autoIndent);

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID, [{ "key": "Ctrl-Alt-I" }, { "key": "Ctrl-Alt-I", "platform": "mac" }]);
});
