var makeLine = function(initialSegment, duration, initialLoopStart){
    initialLoopStart = initialLoopStart || Date.now();
    var lastLoopStart = initialLoopStart,
        loopDuration,
        segments = [initialSegment], 
        times = [],
        path = new paper.Path();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
    return {
        segments: segments,
        times: times,
        pushSegment: function(segment, time){
            var previous_point = segments[segments.length - 1],
                distance = Math.pow(segment.x - previous_point.x, 2) + Math.pow(segment.y - previous_point.y, 2),
                relativeTime;

            // return if point is close to previous_point
            if(distance < 10)
                return;

            relativeTime = time - initialLoopStart;
            times.push(relativeTime);
            path.addSegment(segment);
            segments.push(segment);

            if(duration){
                loopDuration = Math.ceil(relativeTime / duration) * duration;
            }else{
                loopDuration = relativeTime;
            }
        },
        end: function(segment, time){
            // does nothing in the meantime
            // do path simplification here?
            this.pushSegment(segment, time);
        },
        redraw: function(now){
            var elapsed = now - lastLoopStart,
                segmentsToShow = segments.filter(function(s, i){
                    return times[i] < elapsed;
                });
            path.removeSegments();
            path.addSegments(segmentsToShow);
            path.smooth();
            path.simplify();
            if(elapsed - loopDuration > 0){
                lastLoopStart = now;
            }
        }
    };
};
