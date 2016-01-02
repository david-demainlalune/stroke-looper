var makeLine = function(duration, creationTime){
    creationTime = creationTime || Date.now();
    var lastLoopStart = creationTime,
        loopDuration,
        segments = [], 
        times = [],
        path = new paper.Path();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
    return {
        segments: segments,
        times: times,
        pushSegment: function(segment, time){
            var relativeTime = time - creationTime;
            times.push(relativeTime);
            path.addSegment(segment);
            segments.push(segment);
            if(duration){
                loopDuration = Math.ceil(relativeTime / duration) * duration;
            }else{
                loopDuration = relativeTime + 100;
            }
        },
        redraw: function(now){
            var elapsed = now - lastLoopStart,
                segmentsToShow = segments.filter(function(s, i){
                    return times[i] < elapsed;
                });
            path.removeSegments();
            path.addSegments(segmentsToShow);
            if(elapsed - loopDuration > 0){
                lastLoopStart = now;
            }
        }
    };
};
