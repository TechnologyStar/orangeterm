import { VirtualCredentials, RealCredentials, CredentialMapping } from '../types';

export class CredentialMapper {
  private mapping: Map<string, CredentialMapping> = new Map();

  public createMapping(realIp: string, realPassword: string): VirtualCredentials {
    const virtualIp = `vIP_${this.generateRandomId()}`;
    const virtualPassword = `vPWD_${this.generateRandomId()}`;
    
    this.mapping.set(virtualIp, {
      virtualIp,
      virtualPassword,
      realIp,
      realPassword,
    });

    return { virtualIp, virtualPassword };
  }

  public getRealCredentials(virtualIp: string): RealCredentials | null {
    const mapping = this.mapping.get(virtualIp);
    if (!mapping) return null;

    return {
      realIp: mapping.realIp,
      realPassword: mapping.realPassword,
    };
  }

  public replaceVirtualToReal(cmd: string): string {
    let result = cmd;
    
    for (const [virtualIp, creds] of this.mapping.entries()) {
      result = result.replaceAll(virtualIp, creds.realIp);
      result = result.replaceAll(creds.virtualPassword, creds.realPassword);
    }

    return result;
  }

  public replaceRealToVirtual(cmd: string): string {
    let result = cmd;

    for (const [virtualIp, creds] of this.mapping.entries()) {
      result = result.replaceAll(creds.realIp, virtualIp);
      result = result.replaceAll(creds.realPassword, creds.virtualPassword);
    }

    return result;
  }

  public getAllMappings(): CredentialMapping[] {
    return Array.from(this.mapping.values());
  }

  public clearMappings(): void {
    this.mapping.clear();
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}

export const credentialMapper = new CredentialMapper();
