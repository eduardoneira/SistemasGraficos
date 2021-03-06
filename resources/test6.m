close all
clear all

control_points = [0.66736, -1.02586;
                  0.32259, -1.02586;
                 -0.27008, -1.05826;
                 -0.40202, -0.73973;
                 -0.61536, -0.22469;
                 -0.02215,  0.53648;
                 -0.04020,  1.04526;
                 -0.06015,  1.60754;
                 -0.51459,  1.97855;
                 -0.51459,  2.30762;
                 -0.51459,  2.46472;
                 -0.17955,  2.45541;
                 -0.14813,  2.61172];
             
minx = min(control_points(:,1));
miny = min(control_points(:,2));

control_points(:,1) = control_points(:,1) - minx;
control_points(:,2) = control_points(:,2) - miny;

maxx = max(control_points(:,1));
maxy = max(control_points(:,2));

maxall = max(maxx, maxy);

control_points(:,1) = control_points(:,1)/maxall;
control_points(:,2) = control_points(:,2)/maxall;

control_points(:,1) = control_points(:,1)*-1;

minx = min(control_points(:,1));
control_points(:,1) = control_points(:,1) - minx;

figure, hold on
grid on
axis([0,1,0,1])
plot(control_points(:,1), control_points(:,2), 'or')