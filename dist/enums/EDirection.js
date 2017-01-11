var EDirection;
(function (EDirection) {
    EDirection[EDirection["NORTH"] = (Math.PI * 1.5)] = "NORTH";
    EDirection[EDirection["NORTHEAST"] = (Math.PI * 1.75)] = "NORTHEAST";
    EDirection[EDirection["EAST"] = (Math.PI * 2)] = "EAST";
    EDirection[EDirection["SOUTHEAST"] = (Math.PI * 2.25)] = "SOUTHEAST";
    EDirection[EDirection["SOUTH"] = (Math.PI * 0.5)] = "SOUTH";
    EDirection[EDirection["SOUTHWEST"] = (Math.PI * 0.75)] = "SOUTHWEST";
    EDirection[EDirection["WEST"] = Math.PI] = "WEST";
    EDirection[EDirection["NOTHWEST"] = (Math.PI * 1.25)] = "NOTHWEST";
})(EDirection = exports.EDirection || (exports.EDirection = {}));
;
