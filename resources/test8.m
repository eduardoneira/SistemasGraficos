clear all
close all

points = [1 ,  0 ,   0 ; 
1 ,  1 ,   0 ; 
0 ,  1 ,   0 ; 
0 ,  0 ,   0 ; 
0 ,  -0.25 ,   0 ; 
0 ,  -0.75 ,   0 ; 
0 ,  -1 ,   0 ; 
0 ,  -2 ,   0 ; 
1 ,  -2 ,   0 ; 
1 ,  -1 ,   0 ; 
1 ,  -0.75 ,   0 ; 
1 ,  -0.25 ,   0 ; 
1 ,  0 ,   0 ];

discret = [1 ,  0 ; 
0.9839276671409607 ,  0.2083764672279358 ; 
0.9390990138053894 ,  0.38291409611701965 ; 
0.8705965280532837 ,  0.523612916469574 ; 
0.7835027575492859 ,  0.6304729580879211 ; 
0.6829001307487488 ,  0.703494131565094 ; 
0.5738711357116699 ,  0.7426764965057373 ; 
0.46149834990501404 ,  0.7480199933052063 ; 
0.3508642017841339 ,  0.7195247411727905 ; 
0.24705123901367188 ,  0.6571906208992004 ; 
0.1551419198513031 ,  0.5610176920890808 ; 
0.08021876960992813 ,  0.43100595474243164 ; 
0.027364272624254227 ,  0.26715537905693054 ; 
0.0016609278973191977 ,  0.0694660022854805 ; 
0 ,  0 ; 0 ,  -0.12731771171092987 ; 
0 ,  -0.27816319465637207 ; 
0 ,  -0.442490816116333 ; 
0 ,  -0.6102549433708191 ; 
0 ,  -0.7714099287986755 ; 
0 ,  -0.9159101247787476 ; 
0 ,  -1 ; 0.01607232727110386 ,  -1.208376407623291 ; 
0.06090097874403 ,  -1.3829140663146973 ; 
0.12940345704555511 ,  -1.5236129760742188 ; 
0.2164972573518753 ,  -1.6304728984832764 ; 
0.3170998990535736 ,  -1.7034940719604492 ; 
0.4261288642883301 ,  -1.7426764965057373 ; 
0.5385016798973083 ,  -1.748020052909851 ; 
0.6491357684135437 ,  -1.7195247411727905 ; 
0.7529487609863281 ,  -1.6571906805038452 ; 
0.8448580503463745 ,  -1.5610177516937256 ; 
0.9197812080383301 ,  -1.4310059547424316 ; 
0.9726357460021973 ,  -1.267155408859253 ; 
0.998339056968689 ,  -1.0694659948349 ; 
1 ,  -1 ; 1 ,  -0.8726822733879089 ; 
1 ,  -0.7218368053436279 ; 
1 ,  -0.557509183883667 ; 
1 ,  -0.3897450566291809 ; 
1 ,  -0.22859010100364685 ; 
1 ,  -0.08408989757299423 ; 
1 ,  0 ];

    
figure, hold on
grid on
axis([-2,2,-2,2])
plot(points(:,1), points(:,2), 'or')
plot(discret(:,1), discret(:,2), 'b')