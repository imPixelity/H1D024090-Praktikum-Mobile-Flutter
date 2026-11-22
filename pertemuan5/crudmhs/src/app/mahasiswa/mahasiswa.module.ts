import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { MahasiswaPage } from './mahasiswa.page';
import { MahasiswaPageRoutingModule } from './mahasiswa-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MahasiswaPageRoutingModule],
  declarations: [MahasiswaPage],
})
export class MahasiswaPageModule {}
