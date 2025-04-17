import { ResolveFn, Router } from '@angular/router';
import { SignalRService } from '../../../core/services/signalR/signal-r.service';
import { inject } from '@angular/core';
import { filter, first, firstValueFrom } from 'rxjs';

export const panelResolver: ResolveFn<boolean> = async (route, state) => {
  const signalRService = inject(SignalRService);
  const router = inject(Router);
  const boardId = route.paramMap.get('id');
  console.log("boardId: ", boardId);

  if (!boardId) {
    console.error('ID de tablero no válido');
    router.navigate(['/dashboard']);
    return false;
  }

  try {
    await signalRService.initializeConnection();

    await signalRService.invokeServerMethod('GetMembersBoard', boardId);
    await firstValueFrom(signalRService.usersMembers$.pipe(
      filter(usersmembers => usersmembers !== null),
      first()
    ));

    // Invocar GetBoard y esperar a que board$ no sea null
    await signalRService.invokeServerMethod('GetBoard', boardId);
    await firstValueFrom(signalRService.board$.pipe(
      filter(board => board !== null),
      first()
    ));

    // Invocar GetListBoardByBoard y esperar a que listBoard$ no sea null
    await signalRService.invokeServerMethod('GetListBoardByBoard', boardId);
    await firstValueFrom(signalRService.listBoard$.pipe(
      filter(listBoard => listBoard !== null),
      first()
    ));

    await signalRService.invokeServerMethod('GetCardBoard', boardId);
    await firstValueFrom(signalRService.cards$.pipe(
      filter(card => card !== null),
      first()
    ));


    console.log('Conexión con SignalR establecida correctamente');
    return true;
  } catch (err) {
    console.error('Error al iniciar la conexión con SignalR en el resolver', err);
    router.navigate(['/dashboard']);
    return false;
  }
};
